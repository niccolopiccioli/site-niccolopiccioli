from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.core.cache import cache
from django.core.mail import send_mail
from django.conf import settings
import json
from .models import ContactMessage
import re


def _get_client_ip(request):
    """Extract client IP from request, handling proxied requests."""
    x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
    if x_forwarded_for:
        return x_forwarded_for.split(",")[0].strip()
    return request.META.get("REMOTE_ADDR")


def _is_rate_limited(ip, max_requests=5, window_seconds=3600):
    """Simple rate limiter: max_requests per IP within window_seconds."""
    cache_key = f"contact_rate_{ip}"
    requests_made = cache.get(cache_key, 0)
    if requests_made >= max_requests:
        return True
    cache.set(cache_key, requests_made + 1, window_seconds)
    return False


# Input length constraints
MAX_NAME_LENGTH = 100
MAX_EMAIL_LENGTH = 254
MAX_MESSAGE_LENGTH = 5000


@require_http_methods(["POST"])
def submit_contact(request):
    try:
        # Rate limiting check
        client_ip = _get_client_ip(request)
        if _is_rate_limited(client_ip):
            return JsonResponse(
                {"error": "Troppe richieste. Riprova tra un'ora."},
                status=429,
            )

        data = json.loads(request.body)
        name = data.get("name", "").strip()
        email = data.get("email", "").strip()
        message = data.get("message", "").strip()

        # Required fields validation
        if not name or not email or not message:
            return JsonResponse(
                {"error": "Tutti i campi sono obbligatori."}, status=400
            )

        # Length validation
        if len(name) > MAX_NAME_LENGTH:
            return JsonResponse(
                {"error": f"Il nome non deve superare {MAX_NAME_LENGTH} caratteri."},
                status=400,
            )
        if len(email) > MAX_EMAIL_LENGTH:
            return JsonResponse(
                {"error": f"L'email non deve superare {MAX_EMAIL_LENGTH} caratteri."},
                status=400,
            )
        if len(message) > MAX_MESSAGE_LENGTH:
            return JsonResponse(
                {
                    "error": f"Il messaggio non deve superare {MAX_MESSAGE_LENGTH} caratteri."
                },
                status=400,
            )

        # Email format validation
        email_regex = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
        if not re.match(email_regex, email):
            return JsonResponse({"error": "Formato email non valido."}, status=400)

        # Database insertion
        contact = ContactMessage.objects.create(name=name, email=email, message=message)

        # Send email notification (only if email is configured)
        if settings.EMAIL_HOST_USER and settings.EMAIL_HOST_PASSWORD:
            try:
                email_subject = f"Nuovo messaggio da {name} - Portfolio"
                email_message = f"""
Nuovo messaggio dal form di contatto:

Nome: {name}
Email: {email}

Messaggio:
{message}
"""
                send_mail(
                    subject=email_subject,
                    message=email_message,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=["niccolopiccioli68@gmail.com"],
                    fail_silently=True,
                )
            except Exception as e:
                print(f"Email send error: {e}")

        return JsonResponse({"success": "Messaggio inviato con successo!"}, status=201)

    except json.JSONDecodeError:
        return JsonResponse({"error": "Dati non validi."}, status=400)
    except Exception:
        return JsonResponse({"error": "Errore interno del server."}, status=500)
