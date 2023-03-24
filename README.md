# cleaning_schedule
keep track of when equipment needs to be cleaned

sends emails if equipment needs to be cleaned within the week
changes next date for cleaning in google sheets (=EDATE(D:D, F:F),
adds number of months in column F to date in column D)
google trigger set to run program once a week on monday if next cleaning date is within a week,
sends an email to the person who is responsible for cleaning incubator to clean it or update the google doc if they have already cleaned
