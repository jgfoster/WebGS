# locust -f fast_speed_test.py -u 5 -r 5 --host https://capella:8080 --processes -1

from locust import task, between, FastHttpUser

class MyHighPerfUser(FastHttpUser):
    # Optional: FastHttpUser-specific settings
    connection_timeout = 10.0
    insecure = True  # Set to False to verify SSL certificates

    @task
    def test_https_performance(self):
        # The API is designed to be a drop-in replacement for HttpUser
        self.client.get("/add.gs?x=1&y=2")
