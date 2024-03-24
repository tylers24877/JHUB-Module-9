# UK Police Crime Data
A visual map of past crime at a UK Postcode
## Getting Started

 1. To access this project please go to
    [https://d29650oo6jvc4g.cloudfront.net/](https://d29650oo6jvc4g.cloudfront.net/)
  
 2. Enter a **UK** postcode and click `Request`. The map will then move to the postcode and it'll show you crime which has been reported to the Police within 1 mile of the postcode.
 3. Keep repeating different postcodes!

## How does it work?
**Website Code**
The web application is written in Typescript using React, with Material UI (MUI) used for the styling. Mapping is provided by Mapbox.

When the user clicks request the web app completes: 

 1. API call to convert postcode into Lat/Lng.
 2. API call to get police data within 1 mile of the Lat/Lng received in step 1.
 3. The data is then processed into a format useable with Mapbox. At this point, any entries after 100 are removed.
 4. Processed data is then drawn onto the map.
 5. Map is moved to the postcode location.

**Amazon Web Services (AWS)**
For hosting, AWS's s3 bucket with static hosting function enabled is used. This allows quick, efficient and with high availability hosting of the web app. The s3 bucket is located within the London region (EU_west_2) which is ideal as it's located close to the intended users (considering it's UK postcodes) and the buckets are distributed across all Availability Zones (AZs) within the region for extra redundancy. 

To improve latency and efficiently, I've opted to use AWS Cloudfront as the Content Delivery Network. This provided SSL encryption and caching of the web files. Which will decrease the workload felt by the s3 and improve latency to the end user.
