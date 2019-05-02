# Headstorm Data Science Challenge

### Description

Can we use geographical coordinates paired with a point in time, representing someone's birth date, to
determine the meteorological season? In this competition, the challenge is to develop an algorithm
which accurately identifies a meteorological season based on the inputs of coordinates and birth date.

The challenge is to ingest and interpret data from open APIs and other data sources. You need to determine
which data is useful, finding the signal in the sea of information.

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
        > For the purposes of this challenge, a meteorological season is one of `Winter`, `Spring`, `Summer`, or `Autumn`.

    
   <strong>When do meteorological seasons begin?</strong>
        > Meteorological winter begins on December 1. It includes the months of December, January, and February
        > Meteorological spring begins on March 1 and includes the months of March, April, and May
        > Meteorological summer begins on June 1. It includes the months of June, July, and August
        > Meteorological fall begins on September 1 and includes the months of September, October, and November
    
   <strong>What are some open data APIs I can use that would be useful for this challenge?</strong>
        > https://openweathermap.org/api
    
