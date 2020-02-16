module Api
  module V1
    module Tasks::Operation
      class Delete < Trailblazer::Operation
        step Model(Task, :find_by)
        step Policy::Pundit(TaskPolicy, :destroy?)
        step :destroy!

        def destroy!(options, **)
          options[:model].destroy
        end
      end
    end
  end
end
