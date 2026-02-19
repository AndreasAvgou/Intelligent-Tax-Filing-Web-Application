import pytest
import sys
import os

def run_all_tests():
    print("Test Suite...")
    # Pytest σε όλο τον φάκελο
    exit_code = pytest.main([os.path.dirname(__file__)])
    return exit_code

if __name__ == "__main__":
    sys.exit(run_all_tests())