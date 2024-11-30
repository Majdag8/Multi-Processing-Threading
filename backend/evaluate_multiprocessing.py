from multiprocessing import Process, Pipe
import time
import psutil
import os

def compute_segment_sum(segment, pipe_connection, worker_index):
    """Worker process to compute the sum of a segment and send results via pipe."""
    try:
        segment_sum = sum(segment)
        pipe_connection.send((os.getpid(), worker_index, segment_sum))  # Send PID, worker index, and sum
    except Exception as e:
        pipe_connection.send((os.getpid(), worker_index, f"Error: {e}"))
    finally:
        pipe_connection.close()

def evaluate_multiprocessing_performance():
    """Main function to evaluate multiprocessing performance."""
    data = list(range(1, 1001))  # Numbers from 1 to 1000
    total_workers = 4
    worker_processes = []
    parent_pipes = []
    segment_length = len(data) // total_workers

    current_process = psutil.Process(os.getpid())  # Get current process stats
    initial_cpu = psutil.cpu_percent(interval=0.1)  # Add interval for better accuracy
    initial_memory = current_process.memory_info().rss

    overall_start = time.time()
    print(f"Primary Process ID: {os.getpid()}")

    # Split data and spawn worker processes
    for worker_id in range(total_workers):
        start_idx = worker_id * segment_length
        end_idx = start_idx + segment_length if worker_id < total_workers - 1 else len(data)
        parent_conn, child_conn = Pipe()
        worker = Process(target=compute_segment_sum, args=(data[start_idx:end_idx], child_conn, worker_id))
        worker_processes.append(worker)
        parent_pipes.append(parent_conn)
        worker.start()

    # Collect results from all workers
    worker_results = []
    for pipe in parent_pipes:
        try:
            worker_results.append(pipe.recv())
        except Exception as e:
            print(f"Error receiving data from worker: {e}")

    for worker in worker_processes:
        worker.join()

    combined_sum = sum(result[2] for result in worker_results if isinstance(result[2], int))

    overall_end = time.time()

    final_cpu = psutil.cpu_percent(interval=0.1)  # Re-measure after workers finish
    final_memory = current_process.memory_info().rss

    # Display results for each worker
    print("\nWorker Process Results:")
    for pid, worker_id, partial_sum in worker_results:
        print(f"Worker {worker_id} (PID: {pid}) calculated partial sum: {partial_sum}")

    # Display performance summary
    print("\nPerformance Summary:")
    print(f"Total Sum (Multi-processing): {combined_sum}")
    print(f"Execution Time: {overall_end - overall_start:.4f} seconds")
    print(f"CPU Usage Change: {final_cpu - initial_cpu}%")
    print(f"Memory Usage Change: {(final_memory - initial_memory) / (1024 * 1024):.2f} MB")

    # Prepare the result to send to React (keep the structure)
    result = {
        "worker_results": [
            {"worker_id": worker_id, "pid": pid, "partial_sum": partial_sum}
            for pid, worker_id, partial_sum in worker_results
        ],
        "performance_summary": {
            "total_sum": combined_sum,
            "execution_time": round(overall_end - overall_start, 4),
            "cpu_usage_change": round(final_cpu - initial_cpu, 2),
            "memory_usage_change": round((final_memory - initial_memory) / (1024 * 1024), 2)  # MB
        }
    }

    return result  # Return the result as a dictionary that React can use