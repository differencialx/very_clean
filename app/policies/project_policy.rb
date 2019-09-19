class ProjectPolicy < ApplicationPolicy
  def index?
    true
  end

  def show?
    false
  end

  def create?
    true
  end

  def update?
    @record.user == @user
  end

  def destroy?
    @record.user == @user
  end

  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      @user.projects
    end
  end
end
