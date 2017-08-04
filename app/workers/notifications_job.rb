class NotificationsJob < ActiveJob::Base

  require 'net/http'
  require 'uri'
  require 'json'

  def send_push_notification(to,message, data)
    uri = URI.parse("https://fcm.googleapis.com/fcm/send")
    http = Net::HTTP.new(uri.host,uri.port)
    http.use_ssl =true

    request = Net::HTTP::Post.new(uri.request_uri)
    request['Content-Type'] = 'application/json'
    request['Authorization'] = 'key=AAAAorGop6w:APA91bHOvtkg8P9Hyfge08N_jl5hJN2iT7ba1-8qhLFFYY6XbMmpTmF-lwLj9e7pWVh_3b4Kom5XcGsFOEOHHLfaxMWw2BZbHmevDgJnMG_IOj0bg3xJ_50hzQWIFQ4259MzXtk03Kww'
    request.body = {
        notification: message,
        data: data,
        to: to
    }.to_json

    response = http.request(request)

    puts response
  end


  # @param [Array<User>] users
  def perform(users,message)
      users.map{ |id| User.find(id)  }.each do |user|
        if user.is_device_registered?
          send_push_notification(user.firebase_registration_token, message, data)
        end
      end
  end

end