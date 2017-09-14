class ModisDataController < BaseController
  require 'rgeo/geo_json'

  respond_to :json

  def fires
    query = "SELECT * from fire_data_points fires
      WHERE ST_Within(fires.coordinates::geometry,ST_MakePolygon( ST_GeomFromText('#{wkt_linestring}')));
    "
    @fires = FireDataPoint.find_by_sql query
  end

  private

  def modis_data_params
    params.permit(:north, :south, :east, :west)
  end

  def wkt_linestring
    north = modis_data_params[:north]
    south = modis_data_params[:south]
    east = modis_data_params[:east]
    west = modis_data_params[:west]
    "SRID=4326;LINESTRING(#{west} #{north}, #{west} #{south}, #{east} #{south}, #{east} #{north}, #{west} #{north})"
  end

end
