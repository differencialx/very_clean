module Api
  module V1
    module Projects::Operation
      class Delete < Trailblazer::Operation
        step Model(Project, :find_by)
        step Policy::Pundit(ProjectPolicy, :destroy?)
        step :destroy!

        def destroy!(options, **)
          options[:model].destroy
        end
      end
    end
  end
end
