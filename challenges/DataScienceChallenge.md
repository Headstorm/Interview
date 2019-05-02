# Headstorm Data Science Challenge

### Description

Can we use geographical coordinates paired with a point in time, representing someone's birth date, to
determine the meteorological season? In this competition, the challenge is to develop an algorithm
which accurately identifies a meteorological season based on the inputs of coordinates and birth date.

The challenge is to ingest and interpret data from open APIs and other data sources. You need to determine
which data is useful, finding the signal in the sea of information.

### Evaluation
For each `(longitude, latitude, time)` 3-tuple in the given training set, which represents the location
and birth date (in UTC), your model should predict the season in which the 3-tuple occurred.

There is a data set provided in `data/events.csv` you can use to train your model.  Your model
will be evaluated against a similar data set with the same format.

### Metric
Your submission will be evaluated based on the categorization accuracy of your model 
(the percentage of 3-tuples you correctly label).

### Submission
Your submission must be in the form of an executable script, using any platform or language, that correctly
labels 3-tuples in a CSV in the same format as `data/events/csv`.  Examples of valid submissions
include but are not limited to Jupyter Notebooks, RMarkdown, R, Python, Scala, or even Bash scripts.

#### Definitions
   <strong>What is a meteorological season?</strong>
    For the purposes of this challenge, a meteorological season is one of Winter, Spring, Summer, or Autumn.
