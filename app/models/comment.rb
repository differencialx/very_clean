class Comment < ApplicationRecord
  has_one_attached :attachment

  belongs_to :task

  validates :text, presence: true
end
