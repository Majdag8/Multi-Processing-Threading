from flask import Flask, jsonify
from flask_cors import CORS

from evaluate_multiprocessing import evaluate_multiprocessing_performance
from evaluate_multithreading import evaluate_multithreading_performance

app = Flask(__name__)

# Enable CORS for all routes and allow requests from 'http://localhost:3000' (where React is running)
CORS(app, origins="http://localhost:3000")  # Allow requests from the React app

@app.route('/')
def home():
    return "Welcome to the Multi-threading and Multi-processing performance app!"

@app.route('/multiprocessing', methods=['GET'])
def multiprocessing():
    result = evaluate_multiprocessing_performance()
    return jsonify({"message": result})

@app.route('/multithreading', methods=['GET'])
def multithreading():
    result = evaluate_multithreading_performance()
    return jsonify({"message": result})



@app.route('/performance', methods=['GET'])
def performance():
    threading_result = evaluate_multithreading_performance()
    multiprocessing_result = evaluate_multiprocessing_performance()

    # Access the nested performance summary in threading_result and multiprocessing_result
    threading_summary = threading_result['performance_summary']
    multiprocessing_summary = multiprocessing_result['performance_summary']

    # Create the comparison summary
    comparison_summary = {
        "execution_time": {
            "multi_threading": threading_summary['execution_time'],
            "multi_processing": multiprocessing_summary['execution_time']
        },
        "cpu_usage_change": {
            "multi_threading": threading_summary['cpu_usage_change'],
            "multi_processing": multiprocessing_summary['cpu_usage_change']
        },
        "memory_usage_change": {
            "multi_threading": threading_summary['memory_usage_change'],
            "multi_processing": multiprocessing_summary['memory_usage_change']
        }
    }

    result = {
        "threading_result": threading_summary,
        "multiprocessing_result": multiprocessing_summary,
        "comparison_summary": comparison_summary
    }

    return jsonify(result)




if __name__ == "__main__":
    app.run(debug=True)
