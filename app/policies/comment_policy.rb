class CommentPolicy < ApplicationPolicy
  def user_has_access?
    record.task.project.user_id == user.id
  end

  alias_method :create?, :user_has_access?
  alias_method :destroy?, :user_has_access?
end
