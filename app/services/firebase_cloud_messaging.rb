require 'net/http'
require 'uri'
require 'json'

class FirebaseCloudMessaging

  # @param [Report] report
  # @param [Array<User>] to
  def self.send_new_report_notification(to, report)
    NotificationsJob.perform_later(to.map{|u| u.id}, {
        title: report.author.name,
        body: "Reportó un incendio en #{report.location_name}"
    })
  end

end