# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [3.0.0] - 2022-12-09

### Changed

-   Rewrite EventBus methods, in order to be to able to bind one subscriber to multiple events (BREAKING CHANGE).

## [2.0.0] - 2022-12-06

### Added

-   Add EventBus.clear() method.

### Changed

-   Rewrite Subscriber, add an abstract implCallback() method (BREAKING CHANGE).

## [1.1.0] - 2021-08-29

### Changed

-   Rewrite EventBus.once() method, in order to support method chaining.
