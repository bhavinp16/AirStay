# AirStay
AirStay is an online marketplace that connects people who want
to rent out their homes with the people who are looking for 
accomodations in specific locales. <br>
AirStay enables people an easy, relatively stress-free way to 
earn some income from their property by renting their homes and the Guests to find 
homes all over the world that are cheaper and homier than hotels.

## Installation

Fork the repository
1. Install the backend dependencies using commands
    ```
    cd backend
    yarn add
2. Go back to the parent directory
3. Install the frontend dependencies using commands
    ```
    cd client
    yarn add
4. Start the application using `yarn start` in the client directory it will simulteneously start the frontend and the backend.


### Environment variables you need to setup
    - In client directory create .env file and add your mapboxgl public access token 
            REACT_APP_MAPBOX_KEY = 
    - In backend directory inside the config folder create a file called "default.json" and the fomat of content inside is as follows-
            {
                "mongoURI": "",
                "jwtSecret": "",
                "CLOUDINARY_CLOUD_NAME": "",
                "CLOUDINARY_API_KEY": "",
                "CLOUDINARY_API_SECRET": ""
            }
    - Generate your cloudinary keys from cloudinary website, and mongoURI by hosting a cluster on mongodb atlas.

### Backend Dependencies:
```
"dependencies": {
    "bcrypt": "^5.0.1",
    "cloudinary": "^1.27.1",
    "config": "^3.3.6",
    "express": "^4.17.1",
    "express-validator": "^6.13.0",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^6.0.12",
    "multer": "^1.4.4",
    "nodemon": "^2.0.15"
}   
```
### Frontend Dependencies:
```
"dependencies": {
    "@craco/craco": "^6.4.1",
    "@emotion/react": "^11.7.1",
    "@emotion/styled": "^11.6.0",
    "@headlessui/react": "^1.4.2",
    "@heroicons/react": "^1.0.5",
    "@mui/material": "^5.2.5",
    "@react-hook/media-query": "^1.1.1",
    "@testing-library/jest-dom": "^5.11.4",
    "@testing-library/react": "^11.1.0",
    "@testing-library/user-event": "^12.1.10",
    "axios": "^0.24.0",
    "concurrently": "^6.5.1",
    "date-fns": "^2.26.0",
    "feather-icons": "^4.28.0",
    "geolib": "^3.3.3",
    "moment": "^2.29.1",
    "nprogress": "^0.2.0",
    "react": "^17.0.2",
    "react-date-range": "^1.4.0",
    "react-dates": "^21.8.0",
    "react-dom": "^17.0.2",
    "react-map-gl": "^6.1.17",
    "react-router-dom": "^6.0.2",
    "react-scripts": "4.0.3",
    "react-toast-notifications": "^2.5.1",
    "tailwind-scrollbar-hide": "^1.1.5"
 }
```
### Screenshots:
#### Sign Up
![signup](https://user-images.githubusercontent.com/77017010/147478733-c8c99d37-28ac-45c6-bf54-cdf51cac2bf1.png)

#### Home page
![home page](https://user-images.githubusercontent.com/77017010/147478584-5a132636-3097-43a8-8342-d70df4e936ef.png)
![home page scroll down](https://user-images.githubusercontent.com/77017010/147478628-70bcab4a-271f-42e3-a863-a291c00a7a4d.png)

#### Search room
![search](https://user-images.githubusercontent.com/77017010/147478779-ad96bc60-9fdc-448e-a300-30f15e529694.png)

#### Wishlist
![wishlist](https://user-images.githubusercontent.com/77017010/147478809-a573f2a9-0697-41e2-bd64-f32d4881618e.png)

#### Host Room
![hostroom](https://user-images.githubusercontent.com/77017010/147478942-e18d7318-df06-4e44-a9fc-48f919c850d6.png)

#### Room Detail
![roomdetail1](https://user-images.githubusercontent.com/68952732/147486483-991ba6c1-83b3-442d-9986-2fd9e299b5cf.jpg)
![roomdetail2](https://user-images.githubusercontent.com/68952732/147486511-e72fdbe3-e00c-4069-83ee-e75791078f9e.jpg)
![roomdetail3](https://user-images.githubusercontent.com/68952732/147486526-1e51138f-cdc5-444f-b58d-d44963b522fe.jpg)
![roomdetail4](https://user-images.githubusercontent.com/68952732/147486539-383ccf2d-7326-4795-bb2c-fe531e65aabd.jpg)


### Contibutors:
- Bhavin Patel (1911100)
- Piyush Sharma (1911104)
- R. Vishal (1911107)
