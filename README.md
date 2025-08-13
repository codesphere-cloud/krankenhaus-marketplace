# 🏥 KIS Marketplace - Hospital Application Catalog

A modern, professional marketplace application for hospital software services with integrated pricing, deployment, and service management capabilities.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

### 🏪 **Marketplace Catalog**
- **Responsive grid layout** with application cards
- **Comprehensive pricing display** with multiple pricing models
- **Status badges** with color coding (Available, Pilot Started, Planning)
- **Feature highlights** and application details
- **One-click deployment** buttons

### 💰 **Pricing Models**
- **Per-User Pricing**: `€15.99/month per user`
- **Usage-Based**: `€89.99/month + €0.05 per GB`
- **Per-Session**: `€49.99/month + €12.50 per session`
- **Flat Rate**: `€299.99/month`
- **Enterprise**: `€2,499.99/month`

### 🚀 **Deployment Workflow**
- **Interactive pricing calculator** with real-time updates
- **Configuration forms** based on pricing model
- **Setup fee calculation** and total cost estimation
- **Terms acceptance** and deployment confirmation

### 📊 **Service Management Dashboard**
- **Active services overview** with deployment status
- **Monthly and annual cost tracking**
- **Service configuration management**
- **One-click service removal**

### 🎨 **Professional Design**
- **Clean, modern hospital-themed interface**
- **Emerald green accent colors** for medical environment
- **Inter font** for excellent readability
- **Lucide icons** for visual appeal
- **Fully responsive design**

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/alexvcodesphere/krankenhaus-marketplace.git
   cd krankenhaus-marketplace
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   ```
   http://localhost:3000
   ```

## 📂 Project Structure

```
krankenhaus-marketplace/
├── views/                 # EJS templates
│   ├── catalog.ejs       # Main marketplace view
│   ├── detail.ejs        # Application detail view
│   ├── deploy.ejs        # Deployment configuration
│   ├── services.ejs      # User dashboard
│   └── 404.ejs          # Error page
├── public/               # Static assets
│   └── style.css        # Custom styles
├── data.json            # Application data
├── server.js            # Express server
└── package.json         # Dependencies
```

## 🛠️ Available Scripts

- **`npm start`** - Start production server
- **`npm run dev`** - Start development server with auto-reload
- **`npm install`** - Install dependencies

## 🔧 Configuration

### Application Data Structure

Each application in `data.json` follows this structure:

```json
{
  "id": "unique-app-id",
  "title": "Application Name",
  "developer": "Company Name",
  "version": "1.0.0",
  "category": "Category",
  "description": "Application description",
  "status": "Verfügbar|Pilot gestartet|Planung",
  "icon": "lucide-icon-name",
  "pricing": {
    "model": "per_user|usage|per_session|flat|enterprise",
    "basePrice": 15.99,
    "currency": "EUR",
    "period": "month",
    "usagePrice": 0.05,
    "usageUnit": "GB/month",
    "setupFee": 299.99
  },
  "license": "License Type",
  "features": ["Feature 1", "Feature 2", "Feature 3"]
}
```

### Pricing Models

1. **Per-User**: `basePrice * numberOfUsers`
2. **Usage-Based**: `basePrice + (usagePrice * estimatedUsage)`
3. **Per-Session**: `basePrice + (usagePrice * sessionsPerMonth)`
4. **Flat Rate**: Fixed `basePrice`
5. **Enterprise**: Custom `basePrice`

## 🎯 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Main marketplace catalog |
| GET | `/app/:id` | Application details |
| GET | `/deploy/:id` | Deployment configuration |
| POST | `/deploy/:id` | Deploy application |
| GET | `/services` | User services dashboard |
| DELETE | `/services/:id` | Remove deployed service |

## 🎨 Design System

### Colors
- **Primary**: Emerald Green (`#10b981`)
- **Background**: Light Gray (`#f8fafc`)
- **Text**: Slate (`#334155`)
- **Accent**: Blue, Yellow for status badges

### Typography
- **Font Family**: Inter (Google Fonts)
- **Headings**: Semibold to Bold weights
- **Body**: Regular weight with good line-height

### Components
- **Cards**: Rounded corners, subtle shadows
- **Buttons**: Emerald primary, white secondary
- **Badges**: Color-coded status indicators
- **Icons**: Lucide icon library

## 🔒 Security Considerations

- **Input Validation**: Form data validation
- **CSRF Protection**: Recommended for production
- **Rate Limiting**: Recommended for deployment endpoints
- **Authentication**: Ready for integration

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Environment Variables
```env
PORT=3000
NODE_ENV=production
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🏆 Features Roadmap

- [ ] User authentication system
- [ ] Payment integration (Stripe/PayPal)
- [ ] Application reviews and ratings
- [ ] Advanced filtering and search
- [ ] API documentation
- [ ] Admin dashboard
- [ ] Multi-language support
- [ ] Email notifications

## 📞 Support

For support and questions, please open an issue on GitHub.

---

**Built with ❤️ for the healthcare industry**
