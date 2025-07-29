
# Makefile for WhatsApp Monitor Kernel Module

obj-m += whatsapp_monitor.o

KERNEL_DIR := /lib/modules/$(shell uname -r)/build
PWD := $(shell pwd)

all:
	$(MAKE) -C $(KERNEL_DIR) M=$(PWD) modules

clean:
	$(MAKE) -C $(KERNEL_DIR) M=$(PWD) clean
	rm -f *.o *.ko *.mod.c *.mod *.order *.symvers

install:
	sudo insmod whatsapp_monitor.ko

uninstall:
	sudo rmmod whatsapp_monitor

.PHONY: all clean install uninstall
