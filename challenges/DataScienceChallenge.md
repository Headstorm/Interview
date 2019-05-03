# Headstorm Data Science Challenge

### Description
Can we use geographical coordinates paired with a timestamp representing someone's birth date to determine the 
meteorological season in which they were born? The challenge is to develop an algorithm accurately identifying
a meteorological season based on the inputs of coordinates and birth date.  In other words, we need to match
location and birth date to a season. Definitions of the terms used are below.

You will need to ingest and interpret data from open APIs and other data sources to determine
which data is useful, finding the signal in the sea of information.

Of course, we could simply look up the UTC timestamp to determine the season. Unfortunately, we can only
use the season table described below to train and evaluate the correctness of our model.  The model
must determine the season based on other factors, such as weather, location of the earth

### Evaluation
For each `(longitude, latitude, time)` 3-tuple in the given training set, which represents the location
and birth date (in UTC), your model should predict the season in which the birthday occurred.

There is a data set provided in `data/birthdays.csv` you can use to train your model.  Your model
will be evaluated against a similar data set with the same format.

### Metric
Your submission will be evaluated based on the categorization accuracy of your model 
(the percentage of 3-tuples you correctly label).

### Submission
Your submission must be in the form of an executable script, using any platform or language, that correctly
labels 3-tuples in a CSV in the same format as `data/birthdays.csv`.  Examples of valid submissions
include but are not limited to Jupyter Notebooks, RMarkdown, R, Python, Scala, or even Bash scripts.

Submit your script in the form of a `pull-request` to this repository.  How do I submit a
[Pull Request](https://help.github.com/en/articles/about-pull-requests)?

#### FAQ
   <strong>What is a meteorological season?</strong>
>   For the purposes of this challenge, a meteorological season is one of `Winter`, `Spring`, `Summer`, or `Autumn`.
    
   <strong>When do meteorological seasons begin?</strong>
>   * Winter begins on December 1 and includes December, January, and February
>   * Spring begins on March 1 and includes March, April, and May
>   * Summer begins on June 1 and includes June, July, and August
>   * Fall begins on September 1 and includes September, October, and November

   <strong>What is a birth date?</strong>
>   For the purposes of this challenge, the birth date is a Unix Timestamp in UTC between Jan 1 2018 and May 2 2019.
 Examples can be found in the `data/birthdays.csv`.

   <strong>What is a location?</strong>
>   For the purposes of this challenge, the location is a lat/long pair anywhere in or near the United States. Examples 
can be found in the `data/birthdays.csv`.

   <strong>Can I just calculate the season by checking which time frame includes the given timestamp?</strong>
>   Nice try.

   <strong>Can I generate more test data to train my model?</strong>
>   Easily! Just run `sbt run` inside the `data/generate/` directory.  You will need to install `sbt`.
    
   <strong>What are some open data APIs I can use that would be useful for this challenge?</strong>
>   https://openweathermap.org/api
    
