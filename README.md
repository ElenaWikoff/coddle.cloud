# CS373 Summer 2025 Group 1

## Coddle.cloud

Website Link: [https://coddle.cloud/](https://coddle.cloud/)

## Team Members

- Elena Wikoff - @elenawikoff
- Ethan Do - @ed05
- Jane Huynh - @Janehuynh1411
- John Bubonski - @LegendaryFoxFire
- Perry Ehimuh - @PerryE25
- Athony Guo - @yifan-guo01

## Data Sources

- Locations: [FisherMap](https://usa.fishermap.org/)
- Fish Species: [Fishbase.se](https://www.fishbase.se/)
- Lures: [Sportmans](https://www.sportsmans.com/fishing-lures-types-chart?srsltid=AfmBOop3qHaJLkBmOtjPyIz_Nwze7VUmGilTGrGJznWbqH300ToSxvr8)
- Images: [Wikimedia Commons](https://commons.wikimedia.org/wiki/Main_Page)

## Models

### Locations

To display local fishing spots for use by the user.

- Number of Instances: ~100
    - Database Attributes:
        - Coordinates: Lattitude and longitube (clickable map pin)
        - Feature Name: Name of body of water
        - Type: Body of water type (ex. river, pond, etc.)
        - City: City or nearest city from coordinates
        - Zip Code: Postal code (For weather information)
        - Fish Species: Fish that can be found at fishing spot (carousel)
        - Last Updated: When location data was last updated (YYYY-MM-DDTHH:MM:SSZ)
    - Extra Attributes:
        - Weather: Will display local weather information
- Types: maps, text

### Fish Species

To display general info and information useful for catching the fish.

- Number of Instances: ~100
    - Database Attributes:
        - Common Name: Common English name
        - Scientific Name: Latin name (<em>Genus species</em>)
        - Type: Fish type for use by Lures model (tag/param)
        - Environment: Freshwater | Marine (tag/param)
        - Distribution: Native Continent(s) or Ocean(s) (Contitnent/Ocean image)
        - Native Countries: Countries the fish species can be found (to populate map)
        - Max Sizes: Max Length and Weight
        - Max Sizes Units: Metric (cm) or Imperial (in)
        - Biting Temperature: Temperature biting range based on Fishermap
        - Depth Range: Minumum and maximum swimming depth
        - Depth Range Units: Metric (m/km) or Imperial (ft/miles)
        - Description: Short summary of the fish and the fishing experience.
        - Image URL: URL to public domain image
    - Extra Attributes
        - Locations: Fishing spot locations based on location data.
        - Weather: Will display local weather information (relates to biting temperature)
        - Related Fish: Other fish of same type
- Types: images, text

### Lures

Information about lures that provide the user with advice on what lures are best to catch certains types of fishes.

- Number of Instances: 46
    - Database Attributes:
        - Name: The lure subtype
        - Type: The lure type
        - Application: How the lure is best used
        - Fish Types: What types of fish this lure is best used for
        - Image URL: URL to public domain image
- Types: images, text

## Phases

### Phase I

Git SHA: b96de06a09dff10c83e2e8320124709e21f72c8e

|  Team Member  | Estimated Time | Completion Time |
| ------------- | -------------- | --------------- |
| Elena Wikoff  |       20       |        25       |
| Ethan Do      |       35       |        20       |
| Jane Huynh    |       24       |        20       |
| John Bubonski |       30       |        25       |
| Perry Ehimuh  |       15       |        20       |
| Athony Guo    |       25       |        22       |

### Phase II

Git SHA: In Progress (will most likely be the same SHA as Phase III)

### Phase III

Git SHA: In Progress