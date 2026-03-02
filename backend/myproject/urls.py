from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

def api_root(request):
    html = """
    <!DOCTYPE html>
    <html lang="it">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Portfolio API — Niccolò Piccioli</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                background: #f5f5f7;
                color: #1d1d1f;
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                padding: 2rem;
            }
            .card {
                background: #ffffff;
                border-radius: 20px;
                padding: 3rem;
                max-width: 520px;
                width: 100%;
                box-shadow: 0 4px 6px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.08);
                border: 1px solid rgba(0,0,0,0.06);
            }
            .badge {
                display: inline-block;
                background: rgba(0, 113, 227, 0.08);
                color: #0071e3;
                border: 1px solid rgba(0, 113, 227, 0.2);
                border-radius: 980px;
                padding: 0.25rem 0.9rem;
                font-size: 0.75rem;
                font-weight: 600;
                letter-spacing: 0.06em;
                text-transform: uppercase;
                margin-bottom: 1.2rem;
            }
            h1 { font-size: 1.6rem; font-weight: 700; margin-bottom: 0.4rem; }
            .subtitle { color: #6e6e73; font-size: 0.95rem; margin-bottom: 2rem; }
            .endpoint {
                background: #f5f5f7;
                border-radius: 10px;
                padding: 1rem 1.2rem;
                margin-bottom: 1rem;
                display: flex;
                align-items: center;
                gap: 0.8rem;
            }
            .method {
                background: #0071e3;
                color: white;
                padding: 0.2rem 0.6rem;
                border-radius: 6px;
                font-size: 0.75rem;
                font-weight: 700;
                letter-spacing: 0.03em;
                flex-shrink: 0;
            }
            .path { font-family: 'SF Mono', 'Fira Code', monospace; font-size: 0.9rem; color: #1d1d1f; }
            .desc { color: #6e6e73; font-size: 0.85rem; margin-top: 0.2rem; }
            .footer { margin-top: 2rem; color: #6e6e73; font-size: 0.85rem; border-top: 1px solid #e5e5e7; padding-top: 1.2rem; }
            a { color: #0071e3; text-decoration: none; }
            a:hover { text-decoration: underline; }
        </style>
    </head>
    <body>
        <div class="card">
            <div class="badge">REST API</div>
            <h1>Portfolio Backend</h1>
            <p class="subtitle">Niccolò Piccioli — Django REST Framework</p>
            <div class="endpoint">
                <div>
                    <div style="display:flex;align-items:center;gap:0.6rem">
                        <span class="method">POST</span>
                        <span class="path">/api/contact/</span>
                    </div>
                    <div class="desc">Invia un messaggio tramite il form di contatto</div>
                </div>
            </div>
            <div class="footer">
                Frontend: <a href="http://localhost:5173">localhost:5173</a>
                &nbsp;·&nbsp;
                Django REST Framework
            </div>
        </div>
    </body>
    </html>
    """
    return HttpResponse(html)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', api_root, name='api_root'),
    path('', include('contact.urls')),
]
