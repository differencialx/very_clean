module Api
  module V1
    module Projects::Operation
      class Update < Trailblazer::Operation
        step Rescue(ActiveRecord::RecordNotFound, handler: :handle_not_found) {
          step Model(Project, :find)
        }
        step Policy::Pundit(ProjectPolicy, :update?)
        step Contract::Build(constant: Projects::Contract::Update)
        step Contract::Validate(), fail_fast: true
        step Contract::Persist()
        step Projects::Operation::RendererOptions

        def handle_not_found(exception, options)
          options['model.not_found'] = true
        end
      end
    end
  end
end
