class Comment < ApplicationRecord
  has_one_attached :attachment

  belongs_to :task

  validates :text, presence: true

  def thumbnail
    attachment.variant(resize_to_limit: [100, 100]).processed
  end
end
