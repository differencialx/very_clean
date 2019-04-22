module ContactHelpers
  def check_errors(contract = 'contract.default')
    errors_string = subject[contract].errors.to_s

    expected_errors.keys.each { |entity| expect(errors_string).to match(/:#{entity}=>/) } 
    expected_errors.values.flatten.each do |message|
      message = message.inspect unless message.present?
      expect(errors_string).to match(/#{message}/)
    end
  end

  def check_operation_failure(contract = 'contract.default')
    expect(subject).to be_failure
    check_errors(contract)
  end
end
