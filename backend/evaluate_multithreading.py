import threading
import time
import psutil
import os

# Shared resources
grand_total = 0
data_lock = threading.Lock()
thread_outcomes = {}

def compute_sum(numbers, thread_num):
    global grand_total, thread_outcomes
    current_thread_id = threading.get_native_id()
    task_start = time.time()
    print(f"Thread {thread_num} (ID: {current_thread_id}) is processing the range: {numbers}")

    try:
        local_total = sum(numbers)
        with data_lock:
            grand_total += local_total
            thread_outcomes[current_thread_id] = {
                "thread_number": thread_num,
                "partial_sum": local_total
            }
        task_end = time.time()
        print(f"Thread {thread_num} (ID: {current_thread_id}) completed in {task_end - task_start:.4f} seconds. Calculated sum: {local_total}")
    except Exception as e:
        print(f"Thread {thread_num} encountered an error: {e}")
    time.sleep(2)  # Simulate delay

def evaluate_multithreading_performance():
    global grand_total, thread_outcomes
    grand_total = 0  # Reset the total before starting the task
    thread_outcomes = {}  # Clear previous thread outcomes
    
    number_list = [num for num in range(1, 1001)]
    total_threads = 4
    active_threads = []

    process_info = psutil.Process(os.getpid())
    initial_cpu = psutil.cpu_percent(interval=0.1)  # Allow interval for better accuracy
    initial_memory = process_info.memory_info().rss

    execution_start = time.time()
    print(f"Running Process ID: {os.getpid()}")

    partition_size = len(number_list) // total_threads
    for t in range(total_threads):
        start_idx = t * partition_size
        end_idx = start_idx + partition_size if t < total_threads - 1 else len(number_list)
        partition = number_list[start_idx:end_idx]
        thread = threading.Thread(target=compute_sum, args=(partition, t))
        active_threads.append(thread)
        thread.start()

    for thread in active_threads:
        thread.join()

    execution_end = time.time()

    final_cpu = psutil.cpu_percent(interval=0.1)  # Re-measure after threads finish
    final_memory = process_info.memory_info().rss

    print("Finalizing results, please wait...")
    time.sleep(1)

    result = {
        "thread_results": [
            {"thread_id": thread_id, "thread_number": outcome['thread_number'], "partial_sum": outcome['partial_sum']}
            for thread_id, outcome in thread_outcomes.items()
        ],
        "performance_summary": {
            "total_sum": grand_total,
            "execution_time": round(execution_end - execution_start, 4),
            "cpu_usage_change": round(final_cpu - initial_cpu, 2),
            "memory_usage_change": round((final_memory - initial_memory) / (1024 * 1024), 2)
        }
    }

    return result
