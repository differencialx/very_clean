class Comment < ApplicationRecord
  has_one_attached :image

  belongs_to :task

  validates :message, presence: true
end
