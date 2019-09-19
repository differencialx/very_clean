module Api
  module V1
    module Projects::Operation
      class Update < Trailblazer::Operation
        step Model(Project, :find_by)
        step Policy::Pundit(ProjectPolicy, :update?)
        step Contract::Build(constant: Projects::Contract::Update)
        step Contract::Validate(), fail_fast: true
        step Contract::Persist()
        step Projects::Operation::RendererOptions
      end
    end
  end
end
