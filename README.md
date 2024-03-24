# UK Police Crime Data Visualizer

Welcome to the UK Police Crime Data Visualizer! Explore past crime data in the UK right from your browser. Here's how to get started:

## Getting Started

1. **Access the Project**: Visit [here](https://d29650oo6jvc4g.cloudfront.net/) to access the visualizer.
   
2. **Enter a UK Postcode**: Simply input a UK postcode and hit `Request`. The map will instantly display reported crimes within a 1-mile radius of the postcode.

3. **Explore**: Keep entering different postcodes to discover crime patterns across different areas!

## How It Works

### Website Code

The web application is developed using TypeScript and React, with Material UI (MUI) styling. The interactive maps are powered by Mapbox.

Once you request crime data for a postcode, here's what happens behind the scenes:

1. **Postcode to Coordinates**: We make an API call to convert the postcode into latitude and longitude coordinates.

2. **Retrieve Crime Data**: Another API call fetches crime data reported to the police within 1 mile of the coordinates obtained in step 1.

3. **Data Processing**: The received crime data is processed and formatted for integration with Mapbox. We ensure only relevant information is displayed, filtering out excessive entries (above 100) to maintain proformance.

4. **Visualization**: The processed data is then visually represented on the map, providing a clear overview of crime hotspots.

5. **Map Navigation**: The map automatically zooms and centers on the requested postcode.

**Amazon Web Services (AWS)**
For hosting, AWS's s3 bucket with static hosting function enabled is used. This allows quick, efficient and with high availability hosting of the web app. The s3 bucket is located within the London region (EU_west_2) which is ideal as it's located close to the intended users (considering it's UK postcodes) and the buckets are distributed across all Availability Zones (AZs) within the region for extra redundancy. 

To improve latency and efficiently, I've opted to use AWS Cloudfront as the Content Delivery Network. This provided SSL encryption and caching of the web files. Which will decrease the workload felt by the s3 and improve latency to the end user.
