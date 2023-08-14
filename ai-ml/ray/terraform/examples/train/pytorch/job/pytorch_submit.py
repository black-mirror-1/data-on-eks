from ray.job_submission import JobSubmissionClient

address = "http://k8s-ingressn-ingressn-e77a9a2d9e-dea10bceb2fe02a1.elb.us-west-2.amazonaws.com/pytorch/"

client = JobSubmissionClient(address)

kick_off_pytorch_benchmark = (
    # Clone ray. If ray is already present, don't clone again.
    # "git clone https://github.com/ray-project/ray || true;"
    # "cd ray/release/air_tests/air_benchmarks/workloads || true;"
    # "rm tune_torch_benchmark.py || true;"
    # "wget https://github.com/ray-project/ray/blob/0feca5143b794643e8e5bf362ac090eb53071ff8/release/air_tests/air_benchmarks/workloads/tune_torch_benchmark.py || true;"
    # Run the benchmark.
    "python ray/release/air_tests/air_benchmarks/workloads/tune_torch_benchmark.py"
    # "python tune_torch_benchmark.py"
)


submission_id = client.submit_job(
    entrypoint=kick_off_pytorch_benchmark,
)

print("Use the following command to follow this Job's logs:")
print(f"ray job logs '{submission_id}' --follow --address {address}")
