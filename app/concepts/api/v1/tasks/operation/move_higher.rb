module Api
  module V1
    module Tasks::Operation
      class MoveHigher < Trailblazer::Operation
        step Model(Task, :find_by)
        step Policy::Pundit(TaskPolicy, :move_higher?)
        step :move_higher!
        step Tasks::Operation::RendererOptions

        def move_higher!(options, **)
          options[:model].move_higher
          true
        end
      end
    end
  end
end
