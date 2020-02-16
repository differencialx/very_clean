module Api
  module V1
    module Tasks::Operation
      class MoveLower < Trailblazer::Operation
        step Model(Task, :find_by)
        step Policy::Pundit(TaskPolicy, :move_lower?)
        step :move_lower!
        step Tasks::Operation::RendererOptions

        def move_lower!(options, **)
          options[:model].move_lower
          true
        end
      end
    end
  end
end
