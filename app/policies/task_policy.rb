class TaskPolicy < ApplicationPolicy
  def user_has_access?
    record.project.user_id == user.id
  end

  def index?
    record.user_id == user.id
  end

  alias_method :move_lower?, :user_has_access?
  alias_method :move_higher?, :user_has_access?
  alias_method :create?, :user_has_access?
  alias_method :update?, :user_has_access?
  alias_method :destroy?, :user_has_access?
end
