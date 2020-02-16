module Api
  module V1
    class TasksController < ApiController
      before_action :authorize_by_access_cookie!

      def create
        endpoint operation: Tasks::Operation::Create,
                 options: { current_user: current_user }
      end

      def update
        endpoint operation: Tasks::Operation::Update,
                 options: { current_user: current_user }
      end

      def destroy
        endpoint operation: Tasks::Operation::Delete,
                 options: { current_user: current_user }
      end

      def index
        endpoint operation: Tasks::Operation::Index,
                 options: { current_user: current_user }
      end

      def move_higher
        endpoint operation: Tasks::Operation::MoveHigher,
                 options: { current_user: current_user }
      end

      def move_lower
        endpoint operation: Tasks::Operation::MoveLower,
                 options: { current_user: current_user }
      end
    end
  end
end
