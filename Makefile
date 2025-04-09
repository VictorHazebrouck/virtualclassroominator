.PHONY: build-client run-client clean-client build-service-socket run-service-socket clean-service-socket

CLIENT_APP_NAME := client
SOKET_SERVICE_NAME := service-socket
P2P_SERVICE_NAME := service-p2p
SFU_SERVICE_NAME := service-sfu

build-client:
	docker build -f apps/$(CLIENT_APP_NAME)/Dockerfile -t $(CLIENT_APP_NAME) .
run-client:
	docker run -p 80:80 $(CLIENT_APP_NAME)
clean-client:
	docker rm -f $(CLIENT_APP_NAME)-container 2>/dev/null
	docker rmi $(CLIENT_APP_NAME)-app 2>/dev/null

build-service-socket:
	docker build -f apps/$(SOKET_SERVICE_NAME)/Dockerfile -t $(SOKET_SERVICE_NAME) .
run-service-socket:
	docker run -p 80:80 $(SOKET_SERVICE_NAME)
clean-service-socket:
	docker rm -f $(SOKET_SERVICE_NAME)-container 2>/dev/null
	docker rmi $(SOKET_SERVICE_NAME) 2>/dev/null

build-service-p2p:
	docker build -f apps/$(P2P_SERVICE_NAME)/Dockerfile -t $(P2P_SERVICE_NAME) .
run-service-p2p:
	docker run -p 80:80 $(P2P_SERVICE_NAME)
clean-service-p2p:
	docker rm -f $(P2P_SERVICE_NAME)-container 2>/dev/null
	docker rmi $(P2P_SERVICE_NAME) 2>/dev/null

build-service-sfu:
	docker build -f apps/$(SFU_SERVICE_NAME)/Dockerfile -t $(SFU_SERVICE_NAME) .
run-service-sfu:
	docker run -p 80:80 $(SFU_SERVICE_NAME)
clean-service-sfu:
	docker rm -f $(SFU_SERVICE_NAME)-container 2>/dev/null
	docker rmi $(SFU_SERVICE_NAME) 2>/dev/null
