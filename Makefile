.PHONY: \
	build-client run-client clean-client \
	build-service-socket run-service-socket clean-service-socket \
	build-service-p2p run-service-p2p clean-service-p2p \
	build-service-sfu run-service-sfu clean-service-sfu

CLIENT_APP_NAME := client
CLIENT_APP_PORT := 3000

build-client:
	docker build -f apps/$(CLIENT_APP_NAME)/Dockerfile -t $(CLIENT_APP_NAME) .
run-client:
	docker run -p $(CLIENT_APP_PORT):80 $(CLIENT_APP_NAME)
clean-client:
	docker rm -f $(CLIENT_APP_NAME)
	docker rmi $(CLIENT_APP_NAME)


SOCKET_SERVICE_NAME := service-socket
SOCKET_SERVICE_PORT := 3010

build-service-socket:
	docker build -f apps/$(SOCKET_SERVICE_NAME)/Dockerfile -t $(SOCKET_SERVICE_NAME) .
run-service-socket:
	docker run -p $(SOCKET_SERVICE_PORT):3010 $(SOCKET_SERVICE_NAME)
clean-service-socket:
	docker rm -f $(SOCKET_SERVICE_NAME)
	docker rmi $(SOCKET_SERVICE_NAME)


P2P_SERVICE_NAME := service-p2p
P2P_SERVICE_PORT := 3020

build-service-p2p:
	docker build -f apps/$(P2P_SERVICE_NAME)/Dockerfile -t $(P2P_SERVICE_NAME) .
run-service-p2p:
	docker run -p $(P2P_SERVICE_PORT):3020 $(P2P_SERVICE_NAME)
clean-service-p2p:
	docker rm -f $(P2P_SERVICE_NAME)
	docker rmi $(P2P_SERVICE_NAME)


SFU_SERVICE_NAME := service-sfu
SFU_SERVICE_PORT := 3030

build-service-sfu:
	docker build -f apps/$(SFU_SERVICE_NAME)/Dockerfile -t $(SFU_SERVICE_NAME) .
run-service-sfu:
	docker run -p $(SFU_SERVICE_PORT):80 $(SFU_SERVICE_NAME)
clean-service-sfu:
	docker rm -f $(SFU_SERVICE_NAME)
	docker rmi $(SFU_SERVICE_NAME)


build-all:
	- make build-client
	- make build-service-socket
	- make build-service-p2p
	- make build-service-sfu
clean-all:
	- make clean-client
	- make clean-service-socket
	- make clean-service-p2p
	- make clean-service-sfu
