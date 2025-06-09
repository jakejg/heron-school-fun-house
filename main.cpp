#include <iostream>
#include <chrono>
#include <thread>

int main() {
    int age;
    std::cout << "What is your age? ";
    std::cin >> age;

    if (age >= 18) {
        std::cout << "You are an adult";
    } else {
        std::cout << "You are not an adult";
    }

    std::this_thread::sleep_for(std::chrono::seconds(5));
    return 0;
}
