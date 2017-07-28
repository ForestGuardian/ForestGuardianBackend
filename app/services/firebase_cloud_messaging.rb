require 'net/http'
require 'uri'
require 'json'

class FirebaseCloudMessaging

  # @param [Report] report
  # @param [Array<User>] to
  def self.send_new_report_notification(to, report)
    NotificationsJob.perform_later(to.map{|u| u.id}, {
        event: 'report_created',
        report: report.id,
        title: report.title
    })
  end

end