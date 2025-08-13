const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple in-memory storage for deployed services (in production, use a database)
let deployedServices = [];

// Load application data
const loadApplicationData = () => {
    try {
        // Application data
        const applications = [
            {
                "id": "s3-longterm-storage",
                "title": "MediSafe S3 Langzeitarchiv",
                "developer": "SecureHealth IT GmbH",
                "version": "1.2.5",
                "category": "Datenspeicherung & Archivierung",
                "description": "Eine hochsichere und skalierbare Lösung zur langfristigen Archivierung von verschlüsselten medizinischen Daten und Backups. Basiert auf Cold-Storage-Technologie mit S3-kompatiblem Zugriff für maximale Datensicherheit und Compliance.",
                "status": "Pilot gestartet",
                "icon": "database",
                "pricing": {
                    "model": "usage",
                    "basePrice": 89.99,
                    "currency": "EUR",
                    "period": "month",
                    "usagePrice": 0.05,
                    "usageUnit": "GB/month",
                    "setupFee": 299.99
                },
                "license": "Enterprise License",
                "features": ["End-to-End Verschlüsselung", "DSGVO-konform", "99.9% Verfügbarkeit", "24/7 Support"]
            },
            {
                "id": "collaboration-platform",
                "title": "CliniTeam Connect",
                "developer": "Med-Innovations AG",
                "version": "2.1.0",
                "category": "Team-Kollaboration",
                "description": "Eine integrierte Plattform, die medizinischen Teams Werkzeuge für die Zusammenarbeit zur Verfügung stellt. Umfasst sichere Dateiablage, einen gemeinsamen Kalender und Funktionen zur simultanen Bearbeitung von Dokumenten, um die Effizienz und Kommunikation zu verbessern.",
                "status": "Pilot gestartet",
                "icon": "users",
                "pricing": {
                    "model": "per_user",
                    "basePrice": 15.99,
                    "currency": "EUR",
                    "period": "month",
                    "setupFee": 0
                },
                "license": "Pro License",
                "features": ["Unbegrenzte Benutzer", "50GB Speicher pro User", "Video-Konferenzen", "API-Zugang"]
            },
            {
                "id": "secure-messenger",
                "title": "MediChat Secure",
                "developer": "Nexus Health Solutions",
                "version": "3.5.2",
                "category": "Kommunikation",
                "description": "Ein DSGVO-konformer Messenger-Dienst, der speziell für das Gesundheitswesen entwickelt wurde. Ermöglicht den schnellen und sicheren Austausch von Nachrichten und Informationen zwischen Ärzten, Pflegepersonal und anderen Klinikakteuren.",
                "status": "Planung",
                "icon": "message-square",
                "pricing": {
                    "model": "flat",
                    "basePrice": 299.99,
                    "currency": "EUR",
                    "period": "month",
                    "setupFee": 99.99
                },
                "license": "Healthcare License",
                "features": ["Ende-zu-Ende Verschlüsselung", "HIPAA-konform", "Unbegrenzte Nachrichten", "Datei-Sharing"]
            },
            {
                "id": "telekonsil",
                "title": "TeleDoc Konsil",
                "developer": "VirtuMed GmbH",
                "version": "1.8.0",
                "category": "Telemedizin",
                "description": "Eine Plattform zur Durchführung von virtuellen Telekonsilen. Ideal für das Einholen von Zweitmeinungen und die Fernbefundung durch Spezialisten, um die Patientenversorgung über geografische Grenzen hinweg zu optimieren.",
                "status": "Planung",
                "icon": "video",
                "pricing": {
                    "model": "per_session",
                    "basePrice": 49.99,
                    "currency": "EUR",
                    "period": "month",
                    "usagePrice": 12.50,
                    "usageUnit": "session",
                    "setupFee": 199.99
                },
                "license": "Medical License",
                "features": ["HD Video-Qualität", "Bildschirm-Sharing", "Aufzeichnung", "Integration in KIS"]
            },
            {
                "id": "kis",
                "title": "KlinikManager Pro",
                "developer": "CuraSystems",
                "version": "4.0.1",
                "category": "Klinikmanagement",
                "description": "Ein umfassendes Klinikinformationssystem (KIS) zur digitalen Steuerung und Verwaltung aller klinischen und administrativen Prozesse. Unterstützt bei der Behandlungsplanung, Patientendokumentation und der Verwaltung klinischer Daten.",
                "status": "Verfügbar",
                "icon": "activity",
                "pricing": {
                    "model": "enterprise",
                    "basePrice": 2499.99,
                    "currency": "EUR",
                    "period": "month",
                    "setupFee": 9999.99
                },
                "license": "Enterprise License",
                "features": ["Vollständige KIS-Integration", "Unbegrenzte Benutzer", "24/7 Premium Support", "Custom Entwicklung"]
            }
        ];
        return applications;
    } catch (error) {
        console.error('Error loading application data:', error);
        return [];
    }
};

// Utility functions for pricing
const formatPrice = (price, currency = 'EUR') => {
    return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: currency
    }).format(price);
};

const getPricingDisplay = (pricing) => {
    const { model, basePrice, currency, period, usagePrice, usageUnit } = pricing;
    
    switch (model) {
        case 'per_user':
            return `${formatPrice(basePrice, currency)} pro Benutzer/${period}`;
        case 'usage':
            return `${formatPrice(basePrice, currency)}/${period} + ${formatPrice(usagePrice, currency)} pro ${usageUnit}`;
        case 'per_session':
            return `${formatPrice(basePrice, currency)}/${period} + ${formatPrice(usagePrice, currency)} pro ${usageUnit}`;
        case 'flat':
            return `${formatPrice(basePrice, currency)}/${period}`;
        case 'enterprise':
            return `${formatPrice(basePrice, currency)}/${period}`;
        default:
            return `${formatPrice(basePrice, currency)}/${period}`;
    }
};

// Routes
app.get('/', (req, res) => {
    const applications = loadApplicationData();
    res.render('catalog', { 
        title: 'KIS Marketplace - Hospital Application Catalog',
        applications,
        formatPrice,
        getPricingDisplay
    });
});

app.get('/app/:id', (req, res) => {
    const applications = loadApplicationData();
    const app = applications.find(a => a.id === req.params.id);
    
    if (!app) {
        return res.status(404).render('404', {
            title: 'Application Not Found',
            message: 'The requested application could not be found.'
        });
    }
    
    res.render('detail', {
        title: `${app.title} - KIS Marketplace`,
        app,
        formatPrice,
        getPricingDisplay
    });
});

app.get('/deploy/:id', (req, res) => {
    const applications = loadApplicationData();
    const app = applications.find(a => a.id === req.params.id);
    
    if (!app) {
        return res.status(404).render('404', {
            title: 'Application Not Found',
            message: 'The requested application could not be found.'
        });
    }
    
    res.render('deploy', {
        title: `Deploy ${app.title} - KIS Marketplace`,
        app,
        formatPrice,
        getPricingDisplay
    });
});

app.post('/deploy/:id', (req, res) => {
    const applications = loadApplicationData();
    const app = applications.find(a => a.id === req.params.id);
    
    if (!app) {
        return res.status(404).json({ error: 'Application not found' });
    }
    
    const { users = 1, estimatedUsage = 0 } = req.body;
    
    // Create deployment record
    const deployment = {
        id: Date.now().toString(),
        appId: app.id,
        appTitle: app.title,
        appIcon: app.icon,
        developer: app.developer,
        version: app.version,
        deployedAt: new Date(),
        status: 'active',
        users: parseInt(users),
        estimatedUsage: parseFloat(estimatedUsage),
        pricing: app.pricing
    };
    
    deployedServices.push(deployment);
    
    res.redirect('/services');
});

app.get('/services', (req, res) => {
    res.render('services', {
        title: 'Deployed Services - KIS Marketplace',
        deployedServices,
        formatPrice,
        getPricingDisplay
    });
});

app.delete('/services/:id', (req, res) => {
    const serviceId = req.params.id;
    deployedServices = deployedServices.filter(service => service.id !== serviceId);
    res.json({ success: true });
});

// 404 handler
app.use((req, res) => {
    res.status(404).render('404', {
        title: 'Page Not Found',
        message: 'The requested page could not be found.'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🏥 KIS Marketplace server running on http://localhost:${PORT}`);
});
