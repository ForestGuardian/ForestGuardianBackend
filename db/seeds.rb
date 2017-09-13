# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create(email:'testing@forestguardian.org', password:'12341234', password_confirmation:'12341234',
  provider: 'email', uid: 'testing@forestguardian.org', name:'Tester',sign_in_count: 0, tokens: {
        "SH1JKv2Qd3znwS1ConW0ug" => {
            "token" => "$2a$10$F2i8pKNl1DNB2/gU4kATguR5jqNYYFLvtrZ.wTetmNDj/aLeTU1fy",
            "expiry" => 1495314801,
            "last_token" => "$2a$10$yj41.PMVDNAc0j7UD.ZgUe8brvoXXJkn1j2vFSuJbtys7e.uesnmW",
            "updated_at" => "2017-05-06T15:13:21.160-06:00"
        }
    } )
AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password') if Rails.env.development?

# DC2Aq9DVS5Nx