class MapsController < BaseController

  layout 'mobile', only: :windy
  layout 'application', only: :web

  def windy
  end

  def web
  end

end
