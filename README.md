# MapsApp

MapsApp is a dynamic location-based application designed to provide users with tools to explore, save, and interact with various locations on a map. The app combines powerful mapping, user-generated content, and AI-driven insights, making it an all-in-one solution for discovering and managing location data.

## Features

### Core Features

#### Interactive Mapping
- Displays live maps using Leaflet.js or Google Maps.
- Users can create marker points based on live location or search input.

#### Save and Manage Locations
- Save locations with metadata such as name, description, and context.
- View saved locations on the map.

#### Media Sharing
- Attach images, videos, and comments to specific marker points.
- Friends can preview shared media at marker locations.

#### Location Search
- Search for locations using names or keywords.
- Retrieve latitude and longitude of the searched place.

#### AI Insights
- Get information about nearby services (hospitals, schools, Airbnbs) within a user-defined radius.
- AI provides fun facts about selected locations.

#### Tasks and Collaboration
- Assign tasks (e.g., deliveries) to friends or mutuals.
- Track task completion and update records.

#### User Profiles
- Add profile pictures and view user details (e.g., username, user ID).

## Technical Overview

### Frontend

#### Technology Stack
- **Framework**: Next.js (TypeScript-based).
- **UI Components**: ShadCN UI, custom components (e.g., markers).
- **Styling**: Tailwind CSS for responsive and modern design.
- **Storage**: AsyncStorage for search history persistence.

#### Key Functionalities
- Search input with autocomplete.
- Save location form with fields: name, description, latitude, longitude, and context.
- Comments and media preview in the location details sidebar.

### Backend

#### Technology Stack
- **Framework**: FastAPI and Node.js.
- **Database**: MongoDB for storing location data, media, and tasks.
- **Validation**: Firebase for authentication (email, Google, and Facebook).
- **API Design**: RESTful services for location management and search.

#### Key Functionalities
- Location data CRUD operations.
- AI integrations for contextual insights and fun facts.
- Authentication and task assignment APIs.

### Mobile App

#### Technology Stack
- Expo framework with React Native (TypeScript).
- Google Maps API for map integration.

#### Key Functionalities
- Save location data directly from the app.
- Fetch user’s live location and update map dynamically.
- Display saved locations with media previews.

## Installation

### Requirements

#### Frontend
- Node.js >= 16.x
- NPM or Yarn for package management.

#### Backend
- Python >= 3.10
- MongoDB >= 6.x
- Firebase project for authentication.

#### Mobile
- Expo CLI
- Android/iOS simulator or physical device.

### Steps

#### Clone the Repository
```bash
git clone https://github.com/yourusername/mapsapp.git
cd mapsapp
```

#### Install Dependencies

##### Frontend
```bash
cd frontend
npm install
```

##### Backend
```bash
cd backend
pip install -r requirements.txt
```

##### Mobile App
```bash
cd mobile
npm install
```

#### Run the Application

##### Start Backend
```bash
cd backend
uvicorn app.main:app --reload
```

##### Start Frontend
```bash
cd frontend
npm run dev
```

##### Start Mobile
```bash
cd mobile
expo start
```

## Deployment

- **Frontend**: Deploy using Docker and Cloudflare.
- **Backend**: Use a platform like AWS or Azure to host the FastAPI and MongoDB services.
- **Mobile**: Publish on the App Store and Google Play using Expo's build service.

## Contributing

We welcome contributions from the community! Please follow these steps:
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Add feature name"`.
4. Push the branch: `git push origin feature-name`.
5. Create a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contact

For questions or feedback, please contact Stephen Mola at email@example.com.

## Acknowledgments

- Built using Expo, Next.js, and FastAPI.
- Inspired by modern location-based apps.
- Thanks to all contributors and open-source libraries!
