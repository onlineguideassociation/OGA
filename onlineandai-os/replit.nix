{ pkgs }:
{
  deps = [
    pkgs.python311Full
    pkgs.replitPackages.prybar-python311
    pkgs.replitPackages.stderred
  ];
  env = {
    PYTHON_LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath [
      pkgs.stdenv.cc.cc.lib
    ];
    POETRY_CACHE_DIR = "/tmp/poetry_cache";
  };
}