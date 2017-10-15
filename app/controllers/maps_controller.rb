class MapsController < BaseController

  def windy
    render layout: 'mobile'
  end

  def web
    render layout: 'application'
  end

end
