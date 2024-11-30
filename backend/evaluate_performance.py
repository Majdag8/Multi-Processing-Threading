import psutil
import time
from evaluate_multithreading import evaluate_multithreading_performance
from evaluate_multiprocessing import evaluate_multiprocessing_performance

def measure_performance(task_name, task_function):
    """Measures execution time, CPU, and memory usage of a task."""
    process = psutil.Process()  # Get current process
    initial_cpu = process.cpu_percent(interval=None)
    initial_memory = process.memory_info().rss
    start_time = time.time()

    # Run the task
    task_function()

    end_time = time.time()
    final_cpu = process.cpu_percent(interval=None)
    final_memory = process.memory_info().rss

    # Compute metrics
    execution_time = end_time - start_time
    cpu_usage = final_cpu - initial_cpu
    memory_change = (final_memory - initial_memory) / (1024 * 1024)  # Convert bytes to MB

    # Return the performance data
    return {
        "execution_time": execution_time,
        "cpu_usage_change": cpu_usage,
        "memory_usage_change": memory_change
    }

def compare_performance():
    print("Starting Performance Analysis...\n")

    # Measure performance for multi-threading
    threading_metrics = measure_performance("Multi-threading", evaluate_multithreading_performance)

    # Measure performance for multi-processing
    multiprocessing_metrics = measure_performance("Multi-processing", evaluate_multiprocessing_performance)

    # Print individual results
    print("\nPerformance Metrics for Each Program:")
    print(f"\n{threading_metrics['task_name']} Results:")
    print(f"Execution Time: {threading_metrics['execution_time']:.4f} seconds")
    print(f"CPU Usage Change: {threading_metrics['cpu_usage_change']}%")
    print(f"Memory Usage Change: {threading_metrics['memory_usage_change']:.2f} MB")

    print(f"\n{multiprocessing_metrics['task_name']} Results:")
    print(f"Execution Time: {multiprocessing_metrics['execution_time']:.4f} seconds")
    print(f"CPU Usage Change: {multiprocessing_metrics['cpu_usage_change']}%")
    print(f"Memory Usage Change: {multiprocessing_metrics['memory_usage_change']:.2f} MB")

    # Print a comparison table
    print("\nComparison Summary:")
    print(f"{'Metric':<20} {'Multi-threading':<15} {'Multi-processing':<15}")
    print(f"{'Execution Time (s)':<20} {threading_metrics['execution_time']:<15.4f} {multiprocessing_metrics['execution_time']:<15.4f}")
    print(f"{'CPU Usage (%)':<20} {threading_metrics['cpu_usage_change']:<15} {multiprocessing_metrics['cpu_usage_change']:<15}")
    print(f"{'Memory Change (MB)':<20} {threading_metrics['memory_usage_change']:<15.2f} {multiprocessing_metrics['memory_usage_change']:<15.2f}")

if __name__ == "__main__":
    compare_performance()
