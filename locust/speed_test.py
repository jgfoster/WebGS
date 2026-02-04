# Run with: locust -f speed_test.py -u 50 -r 10 --host http://localhost:8888

from locust import HttpUser, task, between


class WebGSUser(HttpUser):
    wait_time = between(0.1, 0.1)

    def on_start(self):
        self.client.verify = False

    @task(1)
    def ajax_request(self):
        self.client.get("/add.gs?x=1&y=2", verify=False)

    # @task(1)
    # def ajax_request(self):
    #     self.client.get("/counter.gs", verify=False)

    # @task(1)
    # def file_request(self):
    #     self.client.get("/index.html", verify=False)

    # @task(1)
    # def cpu_request(self):
    #     self.client.get("/cpu.gs?ms=20", verify=False)
