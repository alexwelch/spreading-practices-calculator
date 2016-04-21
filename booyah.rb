require 'pp'

SUCCESS_RATE = 0.5
RAMP_TIME = 12

enabled_people = 10
desired_enabled_people = 100
failed_enablments = 0

total_time_spent = 0
iterations = [
  {
    accumulated_time: total_time_spent,
    enabled_people: enabled_people,
    failed_enablments: failed_enablments
  }
]


while enabled_people < desired_enabled_people do
  total_time_spent += RAMP_TIME
  failed_enablments += enabled_people * (1 - SUCCESS_RATE)
  enabled_people = enabled_people * (1 + SUCCESS_RATE)

  iterations << {
    accumulated_time: total_time_spent,
    enabled_people: enabled_people,
    failed_enablments: failed_enablments
  }


end

pp  iterations

puts "\n\n TOTAL TIME SPENT: #{total_time_spent} weeks"


# you need a healthy work pipeline to enable
# the higher the initial enabler count the better
# focus on quality of enablement is key, as this compounds over time
