Array methods

forEach, map, filter, concatAll, reduce


//Exercise 1: Print all the names in an array
for(var i = 0; i < array.length; i++) {
		console.log(names[i]);
	}

//Exercise 2: Use forEach to print all the names in an array
names.forEach(function(name) {
		console.log(name);
	});

//Exercise 3: Project an array of videos into an array of {id,title} pairs using forEach()
newReleases.forEach(function(video) {
		videoAndTitlePairs.push({id:video.id, title: video.title});
	});

//Exercise 4: Implement map()
results.push(projectionFunction(itemInArray));

//Exercise 5: Use map() to project an array of videos into an array of {id,title} pairs
return newReleases.map(function(video) {return {id: video.id, title: video.title};});

//Exercise 6: Use forEach() to collect only those videos with a rating of 5.0
newReleases.forEach(function(video) {
		if (video.rating === 5) {
			videos.push(video);
		}
	});

//Exercise 7: Implement filter()
if (predicateFunction(itemInArray)) {
		results.push(itemInArray);
	  }

//Exercise 8: Chain filter and map to collect the ids of videos that have a rating of 5.0
return newReleases.
		filter(function(video) {
			return video.rating === 5.0;
		}).
		map(function(video) {
			return video.id;
		});

//Exercise 9: Flatten the movieLists array into an array of video ids
movieLists.forEach(function(movieList) {
		movieList.videos.forEach(function(video) {
			allVideoIdsInMovieLists.push(video.id);
		});
	});

//Exercise 10: Implement concatAll()
subArray.forEach(function(i) {
      results.push(i);
    });

//Exercise 11: Use map() and concatAll() to project and flatten the movieLists into an array of video ids
return movieLists.
	  map(function(movieList) {
		return movieList.videos.map(function(video) {
			return video.id;
		  });
	  }).
	  concatAll();

//Exercise 12: Retrieve id, title, and a 150x200 box art url for every video
return movieLists.map(function(movie) {
    return movie.videos.map(function(video) {
      return video.boxarts.filter(function(boxart) {
        return boxart.width === 150 && boxart.height === 200;
      }).map(function(boxart) {
        return {id: video.id, title: video.title, boxart: boxart.url};
      });
    }).concatAll();
  }).concatAll();

//Exercise 13: Implement concatMap()
return projectionFunctionThatReturnsArray(item);

//Exercise 14: Use concatMap() to retrieve id, title, and 150x200 box art url for every video
return movieLists.concatMap(function(movie) {
    return movie.videos.concatMap(function(video) {
      return video.boxarts.filter(function(boxart) {
        return boxart.width === 150 && boxart.height === 200;
      }).map(function(boxart) {
        return {id: video.id, title: video.title, boxart: boxart.url};
      });
    });
  });

//Exercise 15: Use forEach to find the largest box art
boxarts.forEach(function(boxart) {
		currentSize = boxart.width * boxart.height;
		if (currentSize > maxSize) {
			largestBoxart = boxart;
			maxSize = currentSize;
		}
	});

//Exercise 16: Implement reduce()
if (this.length === 0) {
		return this;
	}
	else {
		if (arguments.length === 1) {
			counter = 1;
			accumulatedValue = this[0];
		}
		else if (arguments.length >= 2) {
			counter = 0;
			accumulatedValue = initialValue;
		}
		else {
			throw "Invalid arguments.";
		}
		while(counter < this.length) {
			accumulatedValue = combiner(accumulatedValue, this[counter])
			counter++;
		}

//Exercise 17: Retrieve the largest rating
return ratings.
    reduce(function(total, current) {
      if (total > current) {
        return total;
      }
      return current;
    });

//Exercise 18: Retrieve url of the largest boxart
return boxarts.
    reduce(function(total, current) {
      if (total > current) {
        return total;
      }
      return current;
    }).map(function(boxart) {
      return boxart.url;
    });

//Exercise 19: Reducing with an initial value
obj[video.id] = video.title;

//Exercise 20: Retrieve the id, title, and smallest box art url for every video
return movieLists.
		concatMap(function(movieList) {
      return movieList.videos.concatMap(function(video) {
        return video.boxarts.reduce(function(total, current) {
          if (total.width < current.width) {
            return total;
          }
          return current;
        }).map(function(boxart) {
          return {id: video.id, title: video.title, boxart: boxart.url};
        });
      });
	})
