class Task < ApplicationRecord
  acts_as_list scope: [:project_id]

  belongs_to :project

  validates :name, presence: true
end
