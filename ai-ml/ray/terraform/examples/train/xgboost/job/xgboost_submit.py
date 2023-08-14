from ray.job_submission import JobSubmissionClient

address = "http://k8s-ingressn-ingressn-e77a9a2d9e-dea10bceb2fe02a1.elb.us-west-2.amazonaws.com/xgboost/"

client = JobSubmissionClient(address)

kick_off_xgboost_benchmark = (
    # Clone ray. If ray is already present, don't clone again.
    "git clone https://github.com/ray-project/ray || true;"
    # "cd ray/release/air_tests/air_benchmarks/workloads || true;"
    "rm xgboost_benchmark.py || true;"
    "wget https://github.com/ray-project/ray/blob/dc68ec95eaa3b16a350b0dce55485edd0c2bcc38/release/air_tests/air_benchmarks/workloads/xgboost_benchmark.py || true;"
    # Run the benchmark.
    " python xgboost_benchmark.py"
    # "python ray//doc/source/ray-air/examples/xgboost_starter.py"
    " --size 100G --disable-check"
)


submission_id = client.submit_job(
    entrypoint=kick_off_xgboost_benchmark,
)

print("Use the following command to follow this Job's logs:")
print(f"ray job logs '{submission_id}' --follow --address {address}")
