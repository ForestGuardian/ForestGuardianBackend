# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170727203946) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "postgis"

  create_table "fire_data_points", force: :cascade do |t|
    t.decimal   "brightness"
    t.decimal   "scan"
    t.decimal   "track"
    t.datetime  "acq_datetime"
    t.string    "satellite"
    t.string    "confidence"
    t.string    "version"
    t.decimal   "bright_t31"
    t.decimal   "frp"
    t.string    "daynight"
    t.geography "coordinates",  limit: {:srid=>4326, :type=>"st_point", :geographic=>true}
    t.datetime  "created_at",                                                               null: false
    t.datetime  "updated_at",                                                               null: false
  end

  create_table "reports", force: :cascade do |t|
    t.string   "title"
    t.text     "description"
    t.float    "geo_latitude"
    t.float    "geo_longitude"
    t.boolean  "closed"
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
    t.string   "comments"
    t.integer  "author_id"
    t.string   "picture_file_name"
    t.string   "picture_content_type"
    t.integer  "picture_file_size"
    t.datetime "picture_updated_at"
    t.index ["author_id"], name: "index_reports_on_author_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "provider",                    default: "email", null: false
    t.string   "uid",                         default: "",      null: false
    t.string   "encrypted_password",          default: "",      null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",               default: 0,       null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.string   "name"
    t.string   "nickname"
    t.string   "image"
    t.string   "email"
    t.json     "tokens"
    t.datetime "created_at",                                    null: false
    t.datetime "updated_at",                                    null: false
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.string   "firebase_registration_token"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true, using: :btree
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true, using: :btree
  end

  add_foreign_key "reports", "users", column: "author_id"
end
